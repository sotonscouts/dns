require("utils.js");

var DSP_MYTHIC = NewDnsProvider("mythic");
var REG_NONE = NewRegistrar("none");

var SCOUT_GROUP_ORDINALS = [1, 2, 7, 9, 11, 13, 14, 22, 25, 26, 29].map(get_ordinal);
var ADDITIONAL_SUBDOMAIN_SITES = ["explorers", "network", "wilverley"];

var CT1_LEGACY_IP = "20.26.234.44";
var CT1_IP6 = "2603:1020:700:1::48";

var SQUARESPACE_EXT_CUSTOMER_IPS = ["198.185.159.145", "198.49.23.144", "198.49.23.145", "198.185.159.144"];

D("southamptoncityscouts.org.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    // Main website
    A("@", CT1_LEGACY_IP),
    AAAA("@", CT1_IP6),
    CNAME("www", "ghs.googlehosted.com."),

    CNAME("archive", "ct1.southamptoncityscouts.org.uk."),

    // Scout group subdomains
    SCOUT_GROUP_ORDINALS.map(function a(name) { return CNAME(name, "ghs.googlehosted.com.")}),
    // Additional websites
    ADDITIONAL_SUBDOMAIN_SITES.map(function a(name) { return CNAME(name, "ghs.googlehosted.com.")}),

    // CT1
    A("ct1", CT1_LEGACY_IP),
    AAAA("ct1", CT1_IP6),

    // Salute
    CNAME("salute", "kind-ground-0d00af503.6.azurestaticapps.net."),
    CNAME("prodapi.salute", "ct1"),
    CNAME("staging.salute", "proud-dune-0453ca203.6.azurestaticapps.net."),
    CNAME("stagingapi.salute", "ct1"),

    // Volunteer Hub
    CNAME("hub", "ct1"),
    
    // Google Workspace
    GoogleWorkspaceRecordsWithServices("YvpJ0aG8tp_Y94z29UzwqCL30UXHqx2OyQmOspJ8GgY", "legacy"),
    
    // Gmail SPF & DKIM
    TXT("google._domainkey", "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAndiHMSroeG0unRaetpCq1YlBm61AK0IC07uV1XOdyt2njdqUsCV+9bjn7LjH8KmIeTxcbwlNHgIHOWIuH8MY6s/TcxNnTTjct0LTcwXU/NqFWR1CTMQI2KdBTcUdPy5svueMfMvYH7bcPsokBoAU2i69EbJlJ6f9hWwL+1PjfQbbRvq9PDXDx24AssMAqvc3Omh/NTeYpENXTW0p18FHIRCUMuM1Kdraf77pemP/6qyDxW8wArMi04A0qpxzxkoY2tA+0m0ZHx8zrb1D6DJqh6QJUCLgMslBBmNYNNo5WxtQX9Paydkwxrry0NZFL0l/WXymG08N8e/Q8Px6b7n0bwIDAQAB"),

    TXT("_gh-sotonscouts-o", "3da082cda3"),  // GitHub Organisation verification
    TXT("@", "canva-site-verification=nfXxT0bv21bYmOI3h66zaw"),  // Canva.com Domain Verification
    TXT("@", "MS=ms59771085"), // Microsoft Entra
);

D("southamptoncityscouts.co.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    // Redirects to main website
    A("@", CT1_LEGACY_IP),
    AAAA("@", CT1_IP6),
    CNAME("www", "ct1.southamptoncityscouts.org.uk."),

    // Add records for group and old site web redirects
    SCOUT_GROUP_ORDINALS.map(function a(name) { return CNAME(name, "ct1.southamptoncityscouts.org.uk.")}),
    ADDITIONAL_SUBDOMAIN_SITES.map(function a(name) { return CNAME(name, "ct1.southamptoncityscouts.org.uk.")}),

    // Google Workspace
    GoogleWorkspaceRecordsWithServices("8BcNZ26MXsKzFRg3O8rXUG4bpeeFxxEPb4o7PVaV174", "legacy"),
);

D("woodmill.org.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    // Website - Squarespace
    SQUARESPACE_EXT_CUSTOMER_IPS.map(function a(ip) { return A("@", ip, TTL(300)); }),
    CNAME("www", "ext-cust.squarespace.com."),
    CNAME("gwxf586gsalacznmn7tf", "verify.squarespace.com."),

    // Google Workspace
    GoogleWorkspaceRecords("rvtFceqW7Xlvkcj9lrc60v5RKQt5ZGT06VLMa73gAm4", "google_apps"),
);

D("woodmill.co.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    A("@", CT1_LEGACY_IP, TTL(300)),  // Short TTL to allow quick change on Monday
    AAAA("@", CT1_IP6, TTL(300)),  // Short TTL to allow quick change on Monday
    CNAME("www", "ct1.southamptoncityscouts.org.uk.", TTL(300)),

    // Google Workspace - receive only
    GoogleWorkspaceRecords("KKYq5rmA66K87P57Rhi0UHNQYNJScnue8AY53RXlELA", "google_apps", true),
);

D("25th-southampton.org.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    // Website redirects
    A("@", CT1_LEGACY_IP),
    AAAA("@", CT1_IP6),
    CNAME("www", "ct1.southamptoncityscouts.org.uk."),

    GoogleWorkspaceRecords("PiUAKlFrHWE-JB4ltgMf7l9oP_Jj36zSXnbaPA2dwII", "legacy"),
);

D("highfieldscouts.org.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    // Website redirects
    A("@", CT1_LEGACY_IP),
    AAAA("@", CT1_IP6),
    CNAME("www", "ct1.southamptoncityscouts.org.uk."),

    GoogleWorkspaceRecords("lCPO8h-KZRF0k0GHown5PhVDFf_z6MSWIDBVwrtju9c", "legacy"),
)
