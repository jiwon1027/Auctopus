package com.auctopus.project.api.service;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@RequiredArgsConstructor
@Service
public class ChatService extends TextWebSocketHandler {

    private final Map<Integer, List<WebSocketSession>> allClients = new ConcurrentHashMap<>();
    private final Map<Integer, List<WebSocketSession>> twoClients = new ConcurrentHashMap<>();
    private final JSONParser parser = new JSONParser();
    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    private AuctionService auctionService;
    @Autowired
    private LiveService liveService;

    // 사용자가 최초로 웹소켓과 연결이 되었을 때
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String[] chatInfo = getChatInfo(session);
        String chatType = chatInfo[0];
        int liveSeq = Integer.parseInt(chatInfo[1]);

        List<WebSocketSession> clients;
        String key;
        if (chatType.equals("live")) {
            key = liveSeq + "live";
            if (allClients.containsKey(liveSeq)) {
                clients = allClients.get(liveSeq);
            } else {
                clients = new ArrayList<>();
            }
            clients.add(session);
            allClients.put(liveSeq, clients);
        } else {
            key = liveSeq + "chat";
            if (twoClients.containsKey(liveSeq)) {
                clients = twoClients.get(liveSeq);
            } else {
                clients = new ArrayList<>();
            }
            clients.add(session);
            twoClients.put(liveSeq, clients);
        }

        List<String> preChats = redisTemplate.opsForList().range(key, 0, -1);
        for (String jsonString : preChats) {
            session.sendMessage(new TextMessage(jsonString));
        }

    }

    // 사용자와 웹소켓의 연결이 끊겼을 때
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
            throws Exception {
        String[] chatInfo = getChatInfo(session);
        String chatType = chatInfo[0];
        int liveSeq = Integer.parseInt(chatInfo[1]);

        List<WebSocketSession> clients;
        if (chatType.equals("live")) {
            clients = allClients.get(liveSeq);
            if (clients != null) {
                clients.remove(session);
                allClients.put(liveSeq, clients);
            }
        } else {
            clients = twoClients.get(liveSeq);
            if (clients != null) {
                clients.remove(session);
                twoClients.put(liveSeq, clients);
            }
        }
    }

    // 임의의 사용자로부터 메시지가 도착했을 때
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        String[] chatInfo = getChatInfo(session);
        String chatType = chatInfo[0];
        int liveSeq = Integer.parseInt(chatInfo[1]);

        List<WebSocketSession> clients;
        String key;
        if (chatType.equals("live")) {
            key = liveSeq + "live";
            clients = allClients.get(liveSeq);
        } else {
            key = liveSeq + "chat";
            clients = twoClients.get(liveSeq);
        }

        JSONObject jsonInfo = (JSONObject) parser.parse(message.getPayload());
        jsonInfo.put("date", new Timestamp(System.currentTimeMillis()).toString());
        String type = String.valueOf(jsonInfo.get("type"));
        switch (type) {
            case "0":
                TextMessage sendM = new TextMessage(jsonInfo.toJSONString());
                String value = redisTemplate.opsForValue().get(liveSeq + "Top");
                if (value != null) {
                    String[] currTopBidderInfo = value.split("；");
                    jsonInfo.put("topEmail", currTopBidderInfo[0]);
                    jsonInfo.put("topPrice", currTopBidderInfo[1]);
                    jsonInfo.put("topNickname", jsonInfo.get("nickname"));
                }
//                redisTemplate.opsForList().rightPush(key, jsonInfo.toJSONString());
                for (WebSocketSession client : clients)
                    client.sendMessage(sendM);
                break;
            case "1":
                TextMessage chatM = new TextMessage(jsonInfo.toJSONString());
                redisTemplate.opsForList().rightPush(key, jsonInfo.toJSONString());
                for (WebSocketSession client : clients)
                    client.sendMessage(chatM);
                break;
            case "2":
                String currEmail = String.valueOf(jsonInfo.get("userEmail"));
                String currPrice = String.valueOf(jsonInfo.get("message"));
                jsonInfo.put("topEmail", currEmail);
                jsonInfo.put("topPrice", currPrice);
                jsonInfo.put("topNickname", jsonInfo.get("nickname"));
                redisTemplate.opsForValue().set(liveSeq + "Top", currEmail + "；" + currPrice);
                redisTemplate.opsForList().rightPush(key, jsonInfo.toJSONString());
                TextMessage bidM = new TextMessage(jsonInfo.toJSONString());
                for (WebSocketSession client : clients)
                    client.sendMessage(bidM);

                // 자동입찰자들과 비교하여 또 입찰 메시지를 보낼지 파악해야 한다
                String[] topBidderInfo = liveService.autoBidding(liveSeq, currEmail, currPrice);
                if (Integer.parseInt(currPrice) < Integer.parseInt(topBidderInfo[1])) {

                    jsonInfo.put("userEmail", topBidderInfo[0]);
                    jsonInfo.put("topEmail", topBidderInfo[0]);
                    jsonInfo.put("message", topBidderInfo[1]);
                    jsonInfo.put("topPrice", topBidderInfo[1]);
                    jsonInfo.put("nickname", topBidderInfo[2]);
                    jsonInfo.put("topNickname", topBidderInfo[2]);
                    Thread.sleep(1000);
                    jsonInfo.put("date", new Timestamp(System.currentTimeMillis()).toString());
                    redisTemplate.opsForValue()
                            .set(liveSeq + "Top", topBidderInfo[0] + "；" + topBidderInfo[1]);
                    redisTemplate.opsForList().rightPush(key, jsonInfo.toJSONString());
                    bidM = new TextMessage(jsonInfo.toJSONString());
                    for (WebSocketSession client : clients)
                        client.sendMessage(bidM);
                }
                break;
            case "3":
                String sellerEmail = auctionService.getAuction(liveSeq).getUserEmail();
                TextMessage closeM = new TextMessage(jsonInfo.toJSONString());
                if (jsonInfo.get("userEmail").equals(sellerEmail)) {
                    while (!clients.isEmpty()) {
                        WebSocketSession currSession = clients.get(clients.size() - 1);
                        currSession.close();
                    }
                    if (chatType.equals("live")) {
//                        allClients.remove(liveSeq);
                        liveService.deleteLive(liveSeq);
                    }
                } else {
                    for (WebSocketSession currSession : clients)
                        currSession.sendMessage(closeM);
                }
                session.close();
        }
    }


    private String[] getChatInfo(WebSocketSession session) {
        String[] path = session.getUri().getPath().split("/");
        return new String[]{path[path.length - 2], path[path.length - 1]};
    }

}