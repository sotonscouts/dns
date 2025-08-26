function GoogleWorkspaceRecords(site_verification_code, mx_style) {
    if (mx_style !== "legacy" && mx_style !== "google_apps") {
        throw new Error("Invalid MX style: " + mx_style);
    }

    var records = [
        // Include SPF here for now, as we don't send emails from anywhere else
        TXT("@", "v=spf1 include:_spf.google.com ~all"),
    ]

    if (mx_style === "legacy") {
        records.push([
            MX("@", 1, "aspmx.l.google.com."),
            MX("@", 5, "alt1.aspmx.l.google.com."),
            MX("@", 5, "alt2.aspmx.l.google.com."),
            MX("@", 10, "alt3.aspmx.l.google.com."),
            MX("@", 10, "alt4.aspmx.l.google.com."),
        ])
    } else if (mx_style === "google_apps") {
        records.push([
            MX("@", 1, "smtp.google.com."),
        ])
    }

    if (site_verification_code) {
        records.push([
            TXT("@", "google-site-verification=" + site_verification_code),
        ]);
    }

    return records;
}

function GoogleWorkspaceRecordsWithServices(site_verification_code, mx_style) {
    var records = GoogleWorkspaceRecords(site_verification_code, mx_style);
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
