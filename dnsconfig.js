require("utils.js");

var DSP_MYTHIC = NewDnsProvider("mythic");
var REG_NONE = NewRegistrar("none");

var SCOUT_GROUP_ORDINALS = [1, 2, 7, 9, 11, 13, 14, 22, 25, 26, 29].map(get_ordinal);
var ADDITIONAL_SUBDOMAIN_SITES = ["explorers", "network", "wilverley"];

var CT1_LEGACY_IP = "20.26.234.44";
var CT1_IP6 = "2603:1020:700:1::48";

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
    CNAME("salute", "witty-tree-07d1db303.6.azurestaticapps.net."),
    CNAME("prodapi.salute", "ct1"),

    // Zammad
    A("zammad", "20.0.104.23"),
    AAAA("zammad", "2603:1020:702:7::10"),
    CNAME("helpdesk", "zammad"),
    
    // Google Workspace
    GoogleWorkspaceRecordsWithServices("YvpJ0aG8tp_Y94z29UzwqCL30UXHqx2OyQmOspJ8GgY"),
    
    // Gmail SPF & DKIM
    TXT("google._domainkey", "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAndiHMSroeG0unRaetpCq1YlBm61AK0IC07uV1XOdyt2njdqUsCV+9bjn7LjH8KmIeTxcbwlNHgIHOWIuH8MY6s/TcxNnTTjct0LTcwXU/NqFWR1CTMQI2KdBTcUdPy5svueMfMvYH7bcPsokBoAU2i69EbJlJ6f9hWwL+1PjfQbbRvq9PDXDx24AssMAqvc3Omh/NTeYpENXTW0p18FHIRCUMuM1Kdraf77pemP/6qyDxW8wArMi04A0qpxzxkoY2tA+0m0ZHx8zrb1D6DJqh6QJUCLgMslBBmNYNNo5WxtQX9Paydkwxrry0NZFL0l/WXymG08N8e/Q8Px6b7n0bwIDAQAB"),

    TXT("_gh-sotonscouts-o", "3da082cda3"),  // GitHub Organisation verification
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
    GoogleWorkspaceRecordsWithServices("8BcNZ26MXsKzFRg3O8rXUG4bpeeFxxEPb4o7PVaV174"),
);

D("25th-southampton.org.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    // Website redirects
    A("@", CT1_LEGACY_IP),
    AAAA("@", CT1_IP6),
    CNAME("www", "ct1.southamptoncityscouts.org.uk."),

    GoogleWorkspaceRecords("PiUAKlFrHWE-JB4ltgMf7l9oP_Jj36zSXnbaPA2dwII"),
);

D("highfieldscouts.org.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    // Website redirects
    A("@", CT1_LEGACY_IP),
    AAAA("@", CT1_IP6),
    CNAME("www", "ct1.southamptoncityscouts.org.uk."),

    // There is no verification code for this domain as it is on a legacy workspace.
    GoogleWorkspaceRecords(null),
)
