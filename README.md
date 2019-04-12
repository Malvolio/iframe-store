# Iframe Store

This is the first draft and proof of concept for the idea of using
NgStore and iframes to create a "portal" site, that is, a parent site
that can host child sites in its window, while giving the children
*completely controlled* access to the parent's store.

It works by creating a real Store in the parent window and a proxy
store in the iframe.  Whenever the Store emits state, it passes
through an outgoing security filter, then through the
[cross-origin communication pipe](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
then out of the proxy store; similarly when the proxy store is sent an
action, the action goes through the pipe, through the incoming
security filter, and into the Store.

The enclosed demo shows a portal running a very simple site, maintain
three numbers as its state and hosting three child sites, each at a
different level of trust.  All four sites are running the same code,
but get different sorts of behavior.  The trusted site, although
coming from a different domain

# TO RUN

Add the following to the /etc/hosts
127.0.0.1	localhost-trusted.portal.com
127.0.0.1	localhost-partner.portal.com
127.0.0.1	localhost-untrusted.portal.com

and then run with

ng serve --disable-host-check


# TO DO

* make the installation of the security filters more explicit
* make the domain names configurable
* come up with an easier way to install the Store Proxy
* integrate with some existing "sub-store" stuff so the Store Proxy
can be just part of the app's Store.
* come up with some pattern of controlling whether the real Store or
  the proxy should be used at all


# LICENCING

Still talking to the lawyers about this (but going to be some flavor
of  "completely open").  If you want to use this or any part of it now,
contact me and we can work something out.
