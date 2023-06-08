
import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class Estadisticas extends Simulation {

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
    headers_2.put("If-None-Match", "W/\"1e3-hAebbnHNPrhYy0WU+ZrxNsSq8T4\"");
    headers_2.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_3 = new HashMap<>();
    headers_3.put("Access-Control-Request-Headers", "content-type");
    headers_3.put("Access-Control-Request-Method", "POST");
    headers_3.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_4 = new HashMap<>();
    headers_4.put("Content-Type", "application/json");
    headers_4.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_8 = new HashMap<>();
    headers_8.put("If-None-Match", "W/\"508-bDcqONKOz1GJXAmpFYFBuQWgN2w\"");
    headers_8.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_9 = new HashMap<>();
    headers_9.put("If-None-Match", "W/\"1b0-axQGoXNOI6WjT5uKugILy2j5Zjg\"");
    headers_9.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_10 = new HashMap<>();
    headers_10.put("If-None-Match", "W/\"7d-w6vOjegbuUuXFq7lXm5bIfme6KA\"");
    headers_10.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_12 = new HashMap<>();
    headers_12.put("If-None-Match", "W/\"14-s4v3CtR9o0NsQxg/JkC8Zk4Evn8\"");
    headers_12.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_16 = new HashMap<>();
    headers_16.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_17 = new HashMap<>();
    headers_17.put("If-None-Match", "W/\"e9-tZWeBsV6vwfKotEeLl7WLliMQNY\"");
    headers_17.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_18 = new HashMap<>();
    headers_18.put("If-None-Match", "W/\"f22-JXwh2M34pcdhEVzCRhNoazwscHk\"");
    headers_18.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_19 = new HashMap<>();
    headers_19.put("If-None-Match", "W/\"a0c-hcDVv4t6h9yjIEWEvzQSi9i/ra0\"");
    headers_19.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_20 = new HashMap<>();
    headers_20.put("If-None-Match", "W/\"521-Ek+J6VEduwT3TR5PwQUfYA2vk84\"");
    headers_20.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_21 = new HashMap<>();
    headers_21.put("If-None-Match", "W/\"c-1bl/ybs8pYaLwWPVCd0mBRAdBaY\"");
    headers_21.put("Origin", "http://localhost:3000");
    
    String uri1 = "localhost";
    
    String uri2 = "http://156.35.163.164:5000";

    ScenarioBuilder scn = scenario("Estadisticas")
      .exec(
        http("request_0")
          .get("/login")
          .headers(headers_0)
          .resources(
            http("request_1")
              .get("/static/js/bundle.js")
              .headers(headers_1),
            http("request_2")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_2)
          )
      )
      .pause(5)
      .exec(
        http("request_3")
          .options("http://" + uri1 + ":5000/usuario/login")
          .headers(headers_3)
          .resources(
            http("request_4")
              .post("http://" + uri1 + ":5000/usuario/login")
              .headers(headers_4)
              .body(RawFileBody("estadisticas/0004_request.json")),
            http("request_5")
              .get("/profile/647c7b32ac48b9ecee1ee67f")
              .headers(headers_0),
            http("request_6")
              .get("/static/js/bundle.js")
              .headers(headers_1),
            http("request_7")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_2),
            http("request_8")
              .get(uri2 + "/seguidores/647c7b32ac48b9ecee1ee67f")
              .headers(headers_8),
            http("request_9")
              .get(uri2 + "/publicaciones/getpublicacion/647c7b32ac48b9ecee1ee67f/fecha")
              .headers(headers_9),
            http("request_10")
              .get(uri2 + "/seguidores/getSeguidores/647c7b32ac48b9ecee1ee67f")
              .headers(headers_10),
            http("request_11")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_2),
            http("request_12")
              .get(uri2 + "/seguidores/isSeguidor/647c7b32ac48b9ecee1ee67f/647c7b32ac48b9ecee1ee67f")
              .headers(headers_12)
          )
      )
      .pause(1)
      .exec(
        http("request_13")
          .get("/stats/")
          .headers(headers_0)
          .resources(
            http("request_14")
              .get("/static/js/bundle.js")
              .headers(headers_1),
            http("request_15")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_2),
            http("request_16")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_16),
            http("request_17")
              .get(uri2 + "/seguidores/getseguidos/647c7b32ac48b9ecee1ee67f")
              .headers(headers_17),
            http("request_18")
              .get(uri2 + "/usuario/getusuarios/647c76a7ac48b9ecee1ee5e0,647c7de3ac48b9ecee1ee6b1,647c7d23ac48b9ecee1ee69e,647c7a92ac48b9ecee1ee65d,647c77f2ac48b9ecee1ee60c,647c772cac48b9ecee1ee5eb,647c7844ac48b9ecee1ee61b,647c7c7eac48b9ecee1ee68f")
              .headers(headers_18),
            http("request_19")
              .get(uri2 + "/usuario/getusuario/id/fecha/647c76a7ac48b9ecee1ee5e0,647c7de3ac48b9ecee1ee6b1,647c7d23ac48b9ecee1ee69e,647c7a92ac48b9ecee1ee65d,647c77f2ac48b9ecee1ee60c,647c772cac48b9ecee1ee5eb,647c7844ac48b9ecee1ee61b,647c7c7eac48b9ecee1ee68f/2007/1993")
              .headers(headers_19),
            http("request_20")
              .get(uri2 + "/usuario/getusuario/id/fecha/647c76a7ac48b9ecee1ee5e0,647c7de3ac48b9ecee1ee6b1,647c7d23ac48b9ecee1ee69e,647c7a92ac48b9ecee1ee65d,647c77f2ac48b9ecee1ee60c,647c772cac48b9ecee1ee5eb,647c7844ac48b9ecee1ee61b,647c7c7eac48b9ecee1ee68f/1992/1958")
              .headers(headers_20),
            http("request_21")
              .get(uri2 + "/usuario/getusuario/id/fecha/647c76a7ac48b9ecee1ee5e0,647c7de3ac48b9ecee1ee6b1,647c7d23ac48b9ecee1ee69e,647c7a92ac48b9ecee1ee65d,647c77f2ac48b9ecee1ee60c,647c772cac48b9ecee1ee5eb,647c7844ac48b9ecee1ee61b,647c7c7eac48b9ecee1ee68f/1958/1873")
              .headers(headers_21)
          )
      );

	  setUp(scn.injectOpen(rampUsers(500).during(120))).protocols(httpProtocol);
  }
}
