# DNS

We control our DNS zones using [DNSControl](https://dnscontrol.org), a DNS management system that allows us to manage our DNS zones in a single repository. It is designed to be easy to edit, and to be hard to make mistakes.

## Prerequisites

You need to install DNSControl on your local machine. You can find the installation instructions [here](https://docs.dnscontrol.org/getting-started/getting-started).

If you are using a code editor to make changes, run `dnscontrol write-types` to generate the TypeScript types for the DNSControl configuration file. This will enable code completion and type checking in your editor.