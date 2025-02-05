require("utils.js");

var DSP_MYTHIC = NewDnsProvider("mythic");
var REG_NONE = NewRegistrar("none");

var SCOUT_GROUP_ORDINALS = [1, 2, 7, 9, 11, 13, 14, 22, 25, 26, 29].map(get_ordinal);
var ADDITIONAL_SUBDOMAIN_SITES = ["explorers", "network", "wilverley"];

var AZURE_WEB_HOST = "51.132.241.167";

D("southamptoncityscouts.org.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    // Main website
    A("@", AZURE_WEB_HOST),  // Redirect is served from Azure
    CNAME("www", "ghs.googlehosted.com."),

    A("archive", AZURE_WEB_HOST),

    // Scout group subdomains
    SCOUT_GROUP_ORDINALS.map(function a(name) { return CNAME(name, "ghs.googlehosted.com.")}),
    // Additional websites
    ADDITIONAL_SUBDOMAIN_SITES.map(function a(name) { return CNAME(name, "ghs.googlehosted.com.")}),
    
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
    A("@", AZURE_WEB_HOST),
    A("www", AZURE_WEB_HOST),

    // Add records for group and old site web redirects
    SCOUT_GROUP_ORDINALS.map(function a(name) { return A(name, AZURE_WEB_HOST)}),
    ADDITIONAL_SUBDOMAIN_SITES.map(function a(name) { return A(name, AZURE_WEB_HOST)}),

    // Google Workspace
    GoogleWorkspaceRecordsWithServices("8BcNZ26MXsKzFRg3O8rXUG4bpeeFxxEPb4o7PVaV174"),
);

D("25th-southampton.org.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    // Website redirects
    A("@", AZURE_WEB_HOST),
    A("www", AZURE_WEB_HOST),

    GoogleWorkspaceRecords("PiUAKlFrHWE-JB4ltgMf7l9oP_Jj36zSXnbaPA2dwII"),
);
