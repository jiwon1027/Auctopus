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
    private final JSONParser parser = new JSONParser();
    private final RedisTemplate<String, String> redisTemplate;
    @Autowired
    private LiveService liveService;

    // 사용자가 최초로 웹소켓과 연결이 되었을 때
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        int liveSeq = getLiveSeq(session);
        List<WebSocketSession> clients;
        if (allClients.containsKey(liveSeq))
            clients = allClients.get(liveSeq);
        else
            clients = new ArrayList<>();
        clients.add(session);
        allClients.put(liveSeq, clients);
        {
            String key = String.valueOf(liveSeq);
            redisTemplate.opsForZSet().add(key, "wsb1017@naver.com", Double.valueOf(150000));
            redisTemplate.opsForZSet().add(key, "taw4654@gmail.com", Double.valueOf(60000));
            redisTemplate.opsForZSet().add(key, "won642312000@naver.com", Double.valueOf(95000));
        }
    }

    // 사용자와 웹소켓의 연결이 끊겼을 때
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
            throws Exception {
        int liveSeq = getLiveSeq(session);
        List<WebSocketSession> clients = allClients.get(liveSeq);
        clients.remove(session);
        allClients.put(liveSeq, clients);
        String key = String.valueOf(liveSeq) + "chat";
        List<String> preChats = redisTemplate.opsForList().range(key, 0, -1);
        for (String jsonString : preChats) {
//            session.sendMessage(new TextMessage(jsonString));
            System.out.println("지난 대화 목록" + jsonString);
        }
    }

    // 임의의 사용자로부터 메시지가 도착했을 때
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        int liveSeq = getLiveSeq(session);
        String key = String.valueOf(liveSeq) + "chat";
        List<WebSocketSession> clients = allClients.get(liveSeq);

        JSONObject jsonInfo = (JSONObject) parser.parse(message.getPayload());
//        System.out.println(jsonInfo);
        jsonInfo.put("date", new Timestamp(System.currentTimeMillis()).toString());
        redisTemplate.opsForList().rightPush(key, jsonInfo.toJSONString());
//        System.out.println(redisTemplate.opsForList().size(key));

        // 입찰 메시지였다면 자동입찰자들과 비교하여 또 입찰 메시지를 보낼지 파악해야 한다
        String type = String.valueOf(jsonInfo.get("type"));
        if (type.equals("2")) {
            String currBidder = String.valueOf(jsonInfo.get("userEmail"));
            String currPrice = String.valueOf(jsonInfo.get("message"));
            jsonInfo.put("date", new Timestamp(System.currentTimeMillis()).toString());
            jsonInfo.put("topBidder", jsonInfo.get("nickname"));
            jsonInfo.put("topPrice", currPrice);
            TextMessage sendM = new TextMessage(jsonInfo.toJSONString());
            System.out.println("경매 합니다~ " + jsonInfo);
            redisTemplate.opsForList().rightPush(key, jsonInfo.toJSONString());
            for (WebSocketSession client : clients)
                client.sendMessage(sendM);

            String[] topBidderInfo = liveService.autoBidding(liveSeq, currBidder, currPrice);
            if (!topBidderInfo[0].equals(currBidder)
                    && Integer.parseInt(currPrice) < Integer.parseInt(topBidderInfo[1])) {
                Thread.sleep(3000);
                jsonInfo.put("nickname", topBidderInfo[0]);
                jsonInfo.put("topBidder", topBidderInfo[0]);
                jsonInfo.put("message", topBidderInfo[1]);
                jsonInfo.put("topPrice", topBidderInfo[1]);
                jsonInfo.put("userEmail", topBidderInfo[2]);
                jsonInfo.put("date", new Timestamp(System.currentTimeMillis()).toString());
                sendM = new TextMessage(jsonInfo.toJSONString());
                redisTemplate.opsForList().rightPush(key, jsonInfo.toJSONString());
                for (WebSocketSession client : clients)
                    client.sendMessage(sendM);
            }
        }
        // 입찰 메시지가 아니라면 그냥 바로 전달만 하면 오케이
        else {
            System.out.println("이거는 경매는 아닙니다" + jsonInfo);
            TextMessage sendM = new TextMessage(jsonInfo.toJSONString());
            for (WebSocketSession client : clients)
                client.sendMessage(sendM);
        }

    }

    private int getLiveSeq(WebSocketSession session) {
        String[] path = session.getUri().getPath().split("/");
        return Integer.parseInt(path[path.length - 1]);
    }

}