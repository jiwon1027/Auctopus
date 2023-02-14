package com.auctopus.project.api.service;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Service
public class LiveChatService extends TextWebSocketHandler {

    private static final ConcurrentHashMap<Integer, List<WebSocketSession>> info = new ConcurrentHashMap<>();

    private static final JSONParser parser = new JSONParser();


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
        System.out.println(message.getPayload());
        TextMessage sendM = new TextMessage(makeMessage(message));

        for (WebSocketSession client : clients) {
            client.sendMessage(sendM);
        }

    }


    private int getLiveSeq(WebSocketSession session) {
        String[] path = session.getUri().getPath().split("/");
        return Integer.parseInt(path[path.length - 1]);
    }


    private String makeMessage(TextMessage message) throws ParseException {
        String payload = message.getPayload();

        JSONObject object = (JSONObject) parser.parse(payload);
        String type = String.valueOf(object.get("type"));
        switch (type) {
            case "0":
//                object.put("message", "0번이로구나!");
//                break;
//            case "1":
//                object.put("message", "1번이로구나!");
//                break;
            case "2":
                object.put("message", "0번으로 해치웟냐!");
                break;
//            case "3":
//                object.put("message", "3번도 해치웠냐");
//                break;
        }
        object.put("date", new Timestamp(System.currentTimeMillis()));
        return object.toJSONString();
    }

}