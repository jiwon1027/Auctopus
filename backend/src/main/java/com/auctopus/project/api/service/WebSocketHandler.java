package com.auctopus.project.api.service;


import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Service
public class WebSocketHandler extends TextWebSocketHandler {

    private static final ConcurrentHashMap<Integer, List<WebSocketSession>> info = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String[] path = session.getUri().getPath().split("/");
        int liveSeq = Integer.parseInt(path[path.length - 1]);
        List<WebSocketSession> clients;
        if (info.containsKey(liveSeq))
            clients = info.get(liveSeq);
        else
            clients = new ArrayList<>();
        clients.add(session);
        info.put(liveSeq, clients);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
            throws Exception {
        String[] path = session.getUri().getPath().split("/");
        int liveSeq = Integer.parseInt(path[path.length - 1]);
        List<WebSocketSession> clients = info.get(liveSeq);
        clients.remove(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        String[] path = session.getUri().getPath().split("/");
        int liveSeq = Integer.parseInt(path[path.length - 1]);
        List<WebSocketSession> clients  = info.get(liveSeq);

        for (WebSocketSession client : clients) {
            client.sendMessage(message);
        }

    }

}