
import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class BuscarUsuarios extends Simulation {

  {
    HttpProtocolBuilder httpProtocol = http
      .baseUrl("http://localhost:3000")
      .inferHtmlResources()
      .acceptHeader("*/*")
      .acceptEncodingHeader("gzip, deflate")
      .acceptLanguageHeader("es-MX,es;q=0.8,en-US;q=0.5,en;q=0.3")
      .userAgentHeader("Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1");
    
    Map<CharSequence, String> headers_0 = new HashMap<>();
    headers_0.put("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8");
    headers_0.put("If-None-Match", "W/\"6d9-3JQWQ3mM5SXXu6eiw1zfE3O3voA\"");
    headers_0.put("Upgrade-Insecure-Requests", "1");
    
    Map<CharSequence, String> headers_1 = new HashMap<>();
    headers_1.put("If-None-Match", "W/\"5aea1e-P7Ty8eUjhgdxsTQ4rAUJtuxs3dU\"");
    
    Map<CharSequence, String> headers_2 = new HashMap<>();
    headers_2.put("Accept", "application/json");
    headers_2.put("Accept-Encoding", "gzip, deflate, br");
    headers_2.put("Content-Type", "application/json");
    headers_2.put("If-Modified-Since", "Fri, 25 Mar 2022 17:45:46 GMT");
    headers_2.put("If-None-Match", "\"1648230346467\"");
    headers_2.put("Sec-Fetch-Dest", "empty");
    headers_2.put("Sec-Fetch-Mode", "cors");
    headers_2.put("Sec-Fetch-Site", "cross-site");
    headers_2.put("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0");
    
    Map<CharSequence, String> headers_3 = new HashMap<>();
    headers_3.put("If-None-Match", "W/\"1e3-hAebbnHNPrhYy0WU+ZrxNsSq8T4\"");
    headers_3.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_4 = new HashMap<>();
    headers_4.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_8 = new HashMap<>();
    headers_8.put("If-None-Match", "W/\"7d-w6vOjegbuUuXFq7lXm5bIfme6KA\"");
    headers_8.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_9 = new HashMap<>();
    headers_9.put("If-None-Match", "W/\"8b2-AqOlmaravg40ocRuCrZ9uMT+b08\"");
    headers_9.put("Origin", "http://localhost:3000");
    
    String uri2 = "http://156.35.163.164:5000";
    
    String uri3 = "https://firefox.settings.services.mozilla.com/v1/buckets/main/collections/ms-language-packs/records/cfr-v1-es-MX";

    ScenarioBuilder scn = scenario("BuscarUsuarios")
      .exec(
        http("request_0")
          .get("/find")
          .headers(headers_0)
          .resources(
            http("request_1")
              .get("/static/js/bundle.js")
              .headers(headers_1),
            http("request_2")
              .get(uri3)
              .headers(headers_2),
            http("request_3")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_3)
          )
      )
      .pause(7)
      .exec(
        http("request_4")
          .get(uri2 + "/usuario/getusuario/filter/Artista/nada/1873/2007/nada")
          .headers(headers_4)
      )
      .pause(3)
      .exec(
        http("request_5")
          .get("/follow")
          .headers(headers_0)
          .resources(
            http("request_6")
              .get("/static/js/bundle.js")
              .headers(headers_1),
            http("request_7")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_3),
            http("request_8")
              .get(uri2 + "/seguidores/getSeguidores/647c7b32ac48b9ecee1ee67f")
              .headers(headers_8),
            http("request_9")
              .get(uri2 + "/usuario/getusuarios/647c78dbac48b9ecee1ee62c,647c797cac48b9ecee1ee63b,647c7de3ac48b9ecee1ee6b1,647c7d23ac48b9ecee1ee69e")
              .headers(headers_9)
          )
      );

	  setUp(scn.injectOpen(constantUsersPerSec(2).during(60))).protocols(httpProtocol);
  }
}
