# DNS

We control our DNS zones using [DNSControl](https://dnscontrol.org), a DNS management system that allows us to manage our DNS zones in a single repository. It is designed to be easy to edit, and to be hard to make mistakes.

## Getting Started

Simply edit the `dnsconfig.js` file in the root of this repository. This file contains the configuration for all of our DNS zones. You can add new zones, edit existing zones, and remove zones as needed.

The configuration file is written in JavaScript, and is designed to be easy to read and understand. Each zone is defined as an object, with the domain name as the key, and the configuration as the value.

See the [DNSControl documentation](https://docs.dnscontrol.org/) for more information on how to configure your DNS zones.

Once you have made your changes, open a pull request with your changes and a member of the team will review and merge them.

## Groups & Sub-sites

We run a website for each scout group and some extra sites for specific purposes. The list of scout groups is defined in the SCOUT_GROUPS constant in the `dnsconfig.js` file. 

If you need to add a new group or sub-site, simply add a new entry to the SCOUT_GROUPS or ADDITIONAL_SITES constant. The code will automatically generate the necessary DNS records for the new site.

## Advanced Editing

You need to install DNSControl on your local machine. You can find the installation instructions [here](https://docs.dnscontrol.org/getting-started/getting-started).

If you are using a code editor to make changes, run `dnscontrol write-types` to generate the TypeScript types for the DNSControl configuration file. This will enable code completion and type checking in your editor.

Once you have made your changes, run `dnscontrol preview` to see a preview of the changes that will be made. If everything looks good, run `dnscontrol push` to push the changes to the DNS provider, if you have the necessary permissions. You will need to set up the necessary credentials for our DNS provider in the `creds.json` file.

Otherwize, you can open a pull request with your changes and a member of the team will review and merge them.