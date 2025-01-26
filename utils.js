function GoogleWorkspaceRecords(site_verification_code) {
    return [
        MX("@", 1, "smtp.google.com."),
        TXT("@", "google-site-verification=" + site_verification_code),

        // Include SPF here for now, as we don't send emails from anywhere else
        TXT("@", "v=spf1 include:_spf.google.com ~all"),
    ]
}

function GoogleWorkspaceRecordsWithServices(site_verification_code) {
    var records = GoogleWorkspaceRecords(site_verification_code);
    records.push([
        CNAME("calendar", "ghs.googlehosted.com."),
        CNAME("drive", "ghs.googlehosted.com."),
        CNAME("groups", "ghs.googlehosted.com."),
        CNAME("mail", "ghs.googlehosted.com."),
        CNAME("sites", "ghs.googlehosted.com."),
    ]);
    return records;
}

function get_ordinal(n) {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
