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
    SCOUT_GROUP_ORDINALS.map(get_subdomain_site_record),
    // Additional websites
    ADDITIONAL_SUBDOMAIN_SITES.map(get_subdomain_site_record),
    
    // Google Workspace
    get_google_workspace_records("YvpJ0aG8tp_Y94z29UzwqCL30UXHqx2OyQmOspJ8GgY", true),
    
    // Gmail SPF & DKIM
    TXT("google._domainkey", "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAndiHMSroeG0unRaetpCq1YlBm61AK0IC07uV1XOdyt2njdqUsCV+9bjn7LjH8KmIeTxcbwlNHgIHOWIuH8MY6s/TcxNnTTjct0LTcwXU/NqFWR1CTMQI2KdBTcUdPy5svueMfMvYH7bcPsokBoAU2i69EbJlJ6f9hWwL+1PjfQbbRvq9PDXDx24AssMAqvc3Omh/NTeYpENXTW0p18FHIRCUMuM1Kdraf77pemP/6qyDxW8wArMi04A0qpxzxkoY2tA+0m0ZHx8zrb1D6DJqh6QJUCLgMslBBmNYNNo5WxtQX9Paydkwxrry0NZFL0l/WXymG08N8e/Q8Px6b7n0bwIDAQAB"),

    TXT("_gh-sotonscouts-o", "3da082cda3"),  // GitHub Organisation verification
);

D("southamptoncityscouts.co.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),
    A("*", AZURE_WEB_HOST),

    // Redirects to main website
    A("@", AZURE_WEB_HOST),
    A("www", AZURE_WEB_HOST),

    // Google Workspace
    get_google_workspace_records("8BcNZ26MXsKzFRg3O8rXUG4bpeeFxxEPb4o7PVaV174", true),
);

D("25th-southampton.org.uk", REG_NONE,
    DnsProvider(DSP_MYTHIC),
    DefaultTTL(3600),

    // Website redirects
    A("@", AZURE_WEB_HOST),
    A("www", AZURE_WEB_HOST),

    get_google_workspace_records("PiUAKlFrHWE-JB4ltgMf7l9oP_Jj36zSXnbaPA2dwII", false),
);

function get_google_workspace_records(site_verification_code, include_alias) {
    var GOOGLE_APPS_DOMAIN_MX = [
        MX("@", 1, "aspmx.l.google.com."),
        MX("@", 5, "alt1.aspmx.l.google.com."),
        MX("@", 5, "alt2.aspmx.l.google.com."),
        MX("@", 10, "alt3.aspmx.l.google.com."),
        MX("@", 10, "alt4.aspmx.l.google.com."),
    ]
    
    var GOOGLE_APPS_ALIAS = [
        CNAME("calendar", "ghs.googlehosted.com."),
        CNAME("drive", "ghs.googlehosted.com."),
        CNAME("groups", "ghs.googlehosted.com."),
        CNAME("mail", "ghs.googlehosted.com."),
        CNAME("sites", "ghs.googlehosted.com."),
    ]

    var records = [
        GOOGLE_APPS_DOMAIN_MX,
        TXT("@", "google-site-verification=" + site_verification_code),

        // Include SPF here for now, as we don't send emails from anywhere else
        TXT("@", "v=spf1 include:_spf.google.com ~all"),
    ]

    if (include_alias) {
        records.push(GOOGLE_APPS_ALIAS);
    }

    return records;
}

function get_ordinal(n) {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function get_subdomain_site_record(name) {
    return CNAME(name, "ghs.googlehosted.com.");
}