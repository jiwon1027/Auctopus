package com.auctopus.project.api.service;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Service
public class ChatService extends TextWebSocketHandler {

    private static final ConcurrentHashMap<Integer, List<WebSocketSession>> info = new ConcurrentHashMap<>();
    private static final JSONParser parser = new JSONParser();
    @Autowired
    LiveService liveService;

    // 사용자가 최초로 웹소켓과 연결이 되었을 때
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        int liveSeq = getLiveSeq(session);
        List<WebSocketSession> clients;

        if (info.containsKey(liveSeq))
            clients = info.get(liveSeq);
        else
            clients = new ArrayList<>();
        clients.add(session);
        info.put(liveSeq, clients);
    }

    // 사용자와 웹소켓의 연결이 끊겼을 때
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
            throws Exception {
        int liveSeq = getLiveSeq(session);
        List<WebSocketSession> clients = info.get(liveSeq);

        clients.remove(session);
    }

    // 임의의 사용자로부터 메시지가 도착했을 때
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        int liveSeq = getLiveSeq(session);
        List<WebSocketSession> clients = info.get(liveSeq);

        JSONObject jsonInfo = (JSONObject) parser.parse(message.getPayload());
        System.out.println(jsonInfo);
        jsonInfo.put("date", new Timestamp(System.currentTimeMillis()).toString());

        // 입찰 메시지였다면 자동입찰자들과 비교하여 또 입찰 메시지를 보낼지 파악해야 한다
        String type = String.valueOf(jsonInfo.get("type"));
        if (type.equals("2")) {
            String currBidder = String.valueOf(jsonInfo.get("userEmail"));
            String currPrice = String.valueOf(jsonInfo.get("message"));
            jsonInfo.put("date", new Timestamp(System.currentTimeMillis()).toString());
            jsonInfo.put("topBidder", String.valueOf(jsonInfo.get("nickname")));
            jsonInfo.put("topPrice", currPrice);
            TextMessage sendM = new TextMessage(jsonInfo.toJSONString());
            System.out.println("경매 합니다~ " + jsonInfo);
            for (WebSocketSession client : clients) {
                client.sendMessage(sendM);
            }

            String[] topBidderInfo = liveService.getTopBidderInfo(liveSeq, currBidder, currPrice);
            if (!topBidderInfo[0].equals(String.valueOf(jsonInfo.get("nickname")))) {
                jsonInfo.put("topBidder", topBidderInfo[0]);
                jsonInfo.put("message", topBidderInfo[1]);
//                jsonInfo.put("topPrice", Integer.parseInt(topBidderInfo[1]));
                jsonInfo.put("date", new Timestamp(System.currentTimeMillis()).toString());
                sendM = new TextMessage(jsonInfo.toJSONString());
                for (WebSocketSession client : clients) {
                    client.sendMessage(sendM);
                }
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