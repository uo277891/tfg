
import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class CicloAplicacion extends Simulation {

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
    headers_1.put("If-None-Match", "W/\"5ae8c6-kkjz+G+Px2SKZt8/oy/NMShG0jU\"");
    
    Map<CharSequence, String> headers_2 = new HashMap<>();
    headers_2.put("Accept", "image/avif,image/webp,*/*");
    headers_2.put("If-None-Match", "W/\"e1b7-XbA50J5xwsnBLdo8iVQFkD2iHEs\"");
    
    Map<CharSequence, String> headers_3 = new HashMap<>();
    headers_3.put("Accept", "image/avif,image/webp,*/*");
    headers_3.put("If-None-Match", "W/\"f1e-1862bce92ac\"");
    
    Map<CharSequence, String> headers_5 = new HashMap<>();
    headers_5.put("If-None-Match", "W/\"5aea1e-P7Ty8eUjhgdxsTQ4rAUJtuxs3dU\"");
    
    Map<CharSequence, String> headers_6 = new HashMap<>();
    headers_6.put("Access-Control-Request-Headers", "content-type");
    headers_6.put("Access-Control-Request-Method", "POST");
    headers_6.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_7 = new HashMap<>();
    headers_7.put("Content-Type", "application/json");
    headers_7.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_10 = new HashMap<>();
    headers_10.put("If-None-Match", "W/\"1e3-hAebbnHNPrhYy0WU+ZrxNsSq8T4\"");
    headers_10.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_11 = new HashMap<>();
    headers_11.put("If-None-Match", "W/\"508-bDcqONKOz1GJXAmpFYFBuQWgN2w\"");
    headers_11.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_12 = new HashMap<>();
    headers_12.put("If-None-Match", "W/\"1b0-axQGoXNOI6WjT5uKugILy2j5Zjg\"");
    headers_12.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_13 = new HashMap<>();
    headers_13.put("If-None-Match", "W/\"7d-w6vOjegbuUuXFq7lXm5bIfme6KA\"");
    headers_13.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_15 = new HashMap<>();
    headers_15.put("If-None-Match", "W/\"14-s4v3CtR9o0NsQxg/JkC8Zk4Evn8\"");
    headers_15.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_19 = new HashMap<>();
    headers_19.put("If-None-Match", "W/\"cfb-6bVZLdXqluf03k3bCSeGbZwu1Lg\"");
    headers_19.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_20 = new HashMap<>();
    headers_20.put("If-None-Match", "W/\"104-amkc3jNjz3uVQ0ELXrXehEcElQo\"");
    headers_20.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_21 = new HashMap<>();
    headers_21.put("If-None-Match", "W/\"e6-CIk2wBQOJ1BkFWLh1yHaf4H7/TI\"");
    headers_21.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_22 = new HashMap<>();
    headers_22.put("If-None-Match", "W/\"1a9-KnNgwsHUL5Xvrq97uUQMuZz4hX0\"");
    headers_22.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_23 = new HashMap<>();
    headers_23.put("If-None-Match", "W/\"1a1-hpIN18M2rcPaSohgGJ2BGVYVG7I\"");
    headers_23.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_24 = new HashMap<>();
    headers_24.put("If-None-Match", "W/\"103-kJ2rWU3x4pN5oHwSfbMc7KB9LhY\"");
    headers_24.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_25 = new HashMap<>();
    headers_25.put("If-None-Match", "W/\"1bb-8LElyEP+e7ksjKYf2YR4C0n7yWA\"");
    headers_25.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_26 = new HashMap<>();
    headers_26.put("If-None-Match", "W/\"19f-hqy9yzqMqicDEdc8ei3dXwVNUkA\"");
    headers_26.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_27 = new HashMap<>();
    headers_27.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_28 = new HashMap<>();
    headers_28.put("If-None-Match", "W/\"124-ZZGeQ0+pvhaA8/48wep1v1TYgvs\"");
    headers_28.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_30 = new HashMap<>();
    headers_30.put("If-None-Match", "W/\"1d4-ZQOaCnWRb8jxBuKJ8heCeqLaVbw\"");
    headers_30.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_32 = new HashMap<>();
    headers_32.put("If-None-Match", "W/\"1af-DS2Mw0tW1g+Qr0ifErmPCFWWVd8\"");
    headers_32.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_34 = new HashMap<>();
    headers_34.put("If-None-Match", "W/\"1ce-TVXwA5Y2u0NHlzMqbNMWJ66qJQ8\"");
    headers_34.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_35 = new HashMap<>();
    headers_35.put("If-None-Match", "W/\"12-CJxT3aLdhonG+y6XAP32p/YTWUY\"");
    headers_35.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_37 = new HashMap<>();
    headers_37.put("If-None-Match", "W/\"299-4W2hN5L17Wm18XtE94OkT6OGa+c\"");
    headers_37.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_39 = new HashMap<>();
    headers_39.put("If-None-Match", "W/\"f6-1S8PjcD7YPtmJhDSORp2ZVWvFIE\"");
    headers_39.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_41 = new HashMap<>();
    headers_41.put("If-None-Match", "W/\"1b7-iOXCKqbfBS9GxK0cuQ8cdnQAC5s\"");
    headers_41.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_42 = new HashMap<>();
    headers_42.put("If-None-Match", "W/\"11d-M151pWy7wqnOVqo2dCBDVWJy9Ts\"");
    headers_42.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_43 = new HashMap<>();
    headers_43.put("If-None-Match", "W/\"cd-gkS+5KGzPax0oegwFhdPkenoOCw\"");
    headers_43.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_44 = new HashMap<>();
    headers_44.put("If-None-Match", "W/\"1ac-Xg+kVaA1PQOQa/pBffvvLJ1n+Fw\"");
    headers_44.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_45 = new HashMap<>();
    headers_45.put("If-None-Match", "W/\"c7-eKt81E4obnioq/W4uvWVfm5HXks\"");
    headers_45.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_47 = new HashMap<>();
    headers_47.put("If-None-Match", "W/\"212-SFUMV5/p1pN6OkA5mmOqus5DuOE\"");
    headers_47.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_48 = new HashMap<>();
    headers_48.put("If-None-Match", "W/\"e0-SLcRu40Yi3KaqTekJSjrF627uCA\"");
    headers_48.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_49 = new HashMap<>();
    headers_49.put("If-None-Match", "W/\"26c-SKxATzmnBdTpmd6TgBCxyjcyamM\"");
    headers_49.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_50 = new HashMap<>();
    headers_50.put("Accept", "audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5");
    headers_50.put("Accept-Encoding", "identity");
    headers_50.put("Range", "bytes=0-");
    headers_50.put("Sec-Fetch-Dest", "audio");
    headers_50.put("Sec-Fetch-Mode", "no-cors");
    headers_50.put("Sec-Fetch-Site", "cross-site");
    
    Map<CharSequence, String> headers_54 = new HashMap<>();
    headers_54.put("If-None-Match", "W/\"11-wflxpVBrEI8evVItOUra2dlUR4k\"");
    headers_54.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_55 = new HashMap<>();
    headers_55.put("If-None-Match", "W/\"1df-eQlefnMGr+coguegVhHrUn5XES4\"");
    headers_55.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_56 = new HashMap<>();
    headers_56.put("If-None-Match", "W/\"47-vzyunicCarfn+p3Fsu6Tqos7Dl0\"");
    headers_56.put("Origin", "http://localhost:3000");
    
    Map<CharSequence, String> headers_57 = new HashMap<>();
    headers_57.put("If-None-Match", "W/\"196-MsGwu/iWBQk+o7Bp5JsGcFCL2+Q\"");
    headers_57.put("Origin", "http://localhost:3000");
    
    String uri1 = "localhost";
    
    String uri2 = "http://156.35.163.164:5000";
    
    String uri3 = "https://res.cloudinary.com/ddtcz5fqr/video/upload/v1685903937/publicaciones/647cda4131fdcef9f2852c25.mp3";

    ScenarioBuilder scn = scenario("CicloAplicacion")
      .exec(
        http("request_0")
          .get("/")
          .headers(headers_0)
          .resources(
            http("request_1")
              .get("/static/js/bundle.js")
              .headers(headers_1),
            http("request_2")
              .get("/static/media/logo.68b0da5e1da8c62243ae.png")
              .headers(headers_2),
            http("request_3")
              .get("/favicon.ico")
              .headers(headers_3)
          )
      )
      .pause(1)
      .exec(
        http("request_4")
          .get("/login")
          .headers(headers_0)
          .resources(
            http("request_5")
              .get("/static/js/bundle.js")
              .headers(headers_5)
          )
      )
      .pause(6)
      .exec(
        http("request_6")
          .options("http://" + uri1 + ":5000/usuario/login")
          .headers(headers_6)
          .resources(
            http("request_7")
              .post("http://" + uri1 + ":5000/usuario/login")
              .headers(headers_7)
              .body(RawFileBody("recordedsimulation/0007_request.json")),
            http("request_8")
              .get("/profile/647c7b32ac48b9ecee1ee67f")
              .headers(headers_0),
            http("request_9")
              .get("/static/js/bundle.js")
              .headers(headers_5),
            http("request_10")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_10),
            http("request_11")
              .get(uri2 + "/seguidores/647c7b32ac48b9ecee1ee67f")
              .headers(headers_11),
            http("request_12")
              .get(uri2 + "/publicaciones/getpublicacion/647c7b32ac48b9ecee1ee67f/fecha")
              .headers(headers_12),
            http("request_13")
              .get(uri2 + "/seguidores/getSeguidores/647c7b32ac48b9ecee1ee67f")
              .headers(headers_13),
            http("request_14")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_10),
            http("request_15")
              .get(uri2 + "/seguidores/isSeguidor/647c7b32ac48b9ecee1ee67f/647c7b32ac48b9ecee1ee67f")
              .headers(headers_15)
          )
      )
      .pause(1)
      .exec(
        http("request_16")
          .get("/")
          .headers(headers_0)
          .resources(
            http("request_17")
              .get("/static/js/bundle.js")
              .headers(headers_5),
            http("request_18")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_10),
            http("request_19")
              .get(uri2 + "/publicaciones/getpublicacionskip/0")
              .headers(headers_19),
            http("request_20")
              .get(uri2 + "/publicaciones/getpublicacion/647dce2639d730f33b144b41")
              .headers(headers_20),
            http("request_21")
              .get(uri2 + "/publicaciones/getpublicacion/647dce1039d730f33b144b39")
              .headers(headers_21),
            http("request_22")
              .get(uri2 + "/publicaciones/getpublicacion/647cda4131fdcef9f2852c25")
              .headers(headers_22),
            http("request_23")
              .get(uri2 + "/publicaciones/getpublicacion/647dcd7339d730f33b144ac5")
              .headers(headers_23),
            http("request_24")
              .get(uri2 + "/publicaciones/getpublicacion/647dcd3939d730f33b144ab5")
              .headers(headers_24),
            http("request_25")
              .get(uri2 + "/publicaciones/getpublicacion/647cde4d31fdcef9f2852ce2")
              .headers(headers_25),
            http("request_26")
              .get(uri2 + "/publicaciones/getpublicacion/647cddf431fdcef9f2852cca")
              .headers(headers_26),
            http("request_27")
              .get(uri2 + "/usuario/getusuario/647c7c7eac48b9ecee1ee68f")
              .headers(headers_27),
            http("request_28")
              .get(uri2 + "/publicaciones/getpublicacion/647cd62031fdcef9f2852a71")
              .headers(headers_28),
            http("request_29")
              .get(uri2 + "/usuario/getusuario/647c7c7eac48b9ecee1ee68f")
              .headers(headers_27),
            http("request_30")
              .get(uri2 + "/usuario/getusuario/647c797cac48b9ecee1ee63b")
              .headers(headers_30),
            http("request_31")
              .get(uri2 + "/usuario/getusuario/647c78dbac48b9ecee1ee62c")
              .headers(headers_27),
            http("request_32")
              .get(uri2 + "/usuario/getusuario/647c7adbac48b9ecee1ee66e")
              .headers(headers_32),
            http("request_33")
              .get(uri2 + "/usuario/getusuario/647c78dbac48b9ecee1ee62c")
              .headers(headers_27),
            http("request_34")
              .get(uri2 + "/usuario/getusuario/647c77f2ac48b9ecee1ee60c")
              .headers(headers_34),
            http("request_35")
              .get(uri2 + "/comentarios/getcomentarios/647dce1039d730f33b144b39")
              .headers(headers_35),
            http("request_36")
              .get(uri2 + "/comentarios/getcomentarios/647dce2639d730f33b144b41")
              .headers(headers_35),
            http("request_37")
              .get(uri2 + "/usuario/getusuario/647c7de3ac48b9ecee1ee6b1")
              .headers(headers_37),
            http("request_38")
              .get(uri2 + "/comentarios/getcomentarios/647dcd7339d730f33b144ac5")
              .headers(headers_35),
            http("request_39")
              .get(uri2 + "/comentarios/getcomentarios/647cda4131fdcef9f2852c25")
              .headers(headers_39),
            http("request_40")
              .get(uri2 + "/comentarios/getcomentarios/647dcd3939d730f33b144ab5")
              .headers(headers_35),
            http("request_41")
              .get(uri2 + "/comentarios/getcomentarios/647cde4d31fdcef9f2852ce2")
              .headers(headers_41),
            http("request_42")
              .get(uri2 + "/publicaciones/getpublicacion/647cd7c831fdcef9f2852b0f")
              .headers(headers_42),
            http("request_43")
              .get(uri2 + "/comentarios/getcomentarios/647cddf431fdcef9f2852cca")
              .headers(headers_43),
            http("request_44")
              .get(uri2 + "/publicaciones/getpublicacion/647cd6fe31fdcef9f2852ac3")
              .headers(headers_44),
            http("request_45")
              .get(uri2 + "/comentarios/getcomentarios/647cd62031fdcef9f2852a71")
              .headers(headers_45),
            http("request_46")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_10),
            http("request_47")
              .get(uri2 + "/usuario/getusuario/647c7d23ac48b9ecee1ee69e")
              .headers(headers_47),
            http("request_48")
              .get(uri2 + "/comentarios/getcomentarios/647cd7c831fdcef9f2852b0f")
              .headers(headers_48),
            http("request_49")
              .get(uri2 + "/comentarios/getcomentarios/647cd6fe31fdcef9f2852ac3")
              .headers(headers_49),
            http("request_50")
              .get(uri3)
              .headers(headers_50)
          )
      )
      .pause(5)
      .exec(
        http("request_51")
          .get("/profile/647c7c7eac48b9ecee1ee68f")
          .headers(headers_0)
          .resources(
            http("request_52")
              .get("/static/js/bundle.js")
              .headers(headers_5),
            http("request_53")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_10),
            http("request_54")
              .get(uri2 + "/seguidores/647c7c7eac48b9ecee1ee68f")
              .headers(headers_54),
            http("request_55")
              .get(uri2 + "/publicaciones/getpublicacion/647c7c7eac48b9ecee1ee68f/fecha")
              .headers(headers_55),
            http("request_56")
              .get(uri2 + "/seguidores/getSeguidores/647c7c7eac48b9ecee1ee68f")
              .headers(headers_56),
            http("request_57")
              .get(uri2 + "/usuario/getusuario/647c7c7eac48b9ecee1ee68f")
              .headers(headers_57),
            http("request_58")
              .get(uri2 + "/seguidores/isSeguidor/647c7c7eac48b9ecee1ee68f/647c7b32ac48b9ecee1ee67f")
              .headers(headers_15)
          )
      )
      .pause(1)
      .exec(
        http("request_59")
          .get("/publication/647dce2639d730f33b144b41")
          .headers(headers_0)
          .resources(
            http("request_60")
              .get("/static/js/bundle.js")
              .headers(headers_5),
            http("request_61")
              .get(uri2 + "/publicaciones/getpublicacion/647dce2639d730f33b144b41")
              .headers(headers_20),
            http("request_62")
              .get(uri2 + "/usuario/getusuario/647c7b32ac48b9ecee1ee67f")
              .headers(headers_10),
            http("request_63")
              .get(uri2 + "/usuario/getusuario/647c7c7eac48b9ecee1ee68f")
              .headers(headers_57),
            http("request_64")
              .get(uri2 + "/comentarios/getcomentarios/647dce2639d730f33b144b41")
              .headers(headers_35)
          )
      );

	  setUp(scn.injectOpen(constantUsersPerSec(2).during(60))).protocols(httpProtocol);
  }
}
