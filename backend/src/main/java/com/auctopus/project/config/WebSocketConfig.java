package com.auctopus.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

    // 메시지를 중간에 라우팅할 때 사용하는 메시지 브로커 구성
    @Override
    public void configureMessageBroker(MessageBrokerRegistry broker) {
        // enableSimpleBroker는 해당 주소를 구독하는 모든 클라이언트에게 메시지를 보낸다.
        // 인자에는 구독 요청의 prefix를 넣고, 클라이언트에서 1번 채널을 구독하고자 하면 /sub/1과 같은 규칙을 따른다.
        broker.enableSimpleBroker("/sub");

        // setApplicationDestinationPrefixes에서는 메시지 발행 요청의 prefix를 넣는다.
        // 즉 /pub로 시작하는 메시지만 해당 broker에서 받아서 처리한다.
        broker.setApplicationDestinationPrefixes("/pub");
    }

    // 클라이언트에서 Websocket에 접속할 수 있는 Endpoint 지정
    @Override
    public void registerStompEndpoints(StompEndpointRegistry endpoint) {
        endpoint.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*").withSockJS();
    }

    // 스프링에 내장된 Simple Message Broker를 사용해 채팅 서버를 구현할 수도 있다.
    // 그러나 몇 가지 문제점이 있는데, 서버를 재시작하면 Message Broker(메시지 큐)에 있는 데이터는 유실되고,
    // 다수의 서버일 경우 서버간 채팅방을 공유할 수 없게 되면서 다른 서버의 사용자와는 채팅이 불가능해진다.
    // 따라서 외부 메시지 브로커를 연동하여 이와 같은 문제점들을 해결하고자 한다.
}