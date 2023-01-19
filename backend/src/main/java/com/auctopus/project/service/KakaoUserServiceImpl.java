package com.auctopus.project.service;

import com.auctopus.project.db.repository.UserRepository;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class KakaoUserServiceImpl implements KakaoUserService {

    @Autowired
    private UserRepository userRepository;

    /*
     * 인가코드(code)를 받으면 AccessToken + ID Token을 발급
     *
     * */
    public HashMap<String, Object> getKakaoAccessToken(String code) {
        String access_Token = "";
        String refresh_Token = "";
        String id_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        HashMap<String, Object> tokenInfo = new HashMap<>();

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=47670895bea0b100009897c133708643"); // TODO REST_API_KEY 입력
            sb.append(
                    "&redirect_uri=https://localhost:8080/kakao/login"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
//            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();
            id_Token = element.getAsJsonObject().get("id_token").getAsString();

            tokenInfo.put(("access_token"), access_Token);
            tokenInfo.put(("id_token"), id_Token);

//            System.out.println("access_token : " + access_Token);
//            System.out.println("refresh_token : " + refresh_Token);
//            System.out.println("id_Token : " + id_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return tokenInfo;
    }

    public HashMap<String, Object> getKakaoUserInfo(String token) throws Exception {

        String reqURL = "https://kapi.kakao.com/v2/user/me";

        HashMap<String, Object> kakaoUserInfo = new HashMap<>();

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization",
                    "Bearer " + token); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
//            System.out.println("response body : " + result);

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            //여기서 사용하는 id는 정확히 뭔지 모르겠음, 그냥 식별자 그 자체고 우리가 활용하는 데이터는 아닌거같음
//            int id = element.getAsJsonObject().get("id").getAsInt();

            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject()
                    .get("has_email").getAsBoolean();
            String email = "";
            String nickname = element.getAsJsonObject().get("properties").getAsJsonObject()
                    .get("nickname").getAsString();
            if (hasEmail) {
                email = element.getAsJsonObject().get("kakao_account").getAsJsonObject()
                        .get("email").getAsString();
            }

//            System.out.println("id : " + id);
//            System.out.println("email : " + email);
//            System.out.println("nickname : " + nickname);

            kakaoUserInfo.put("email", email);
            kakaoUserInfo.put("nickname", nickname);

            br.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return kakaoUserInfo;
    }

}
