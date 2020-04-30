#!/bin/bash
sed -i -e '/^const BACKEND_ROOT = ""/s/""/"http:\/\/api.express.safeplaces.extremesolution.com"/' js/config.js
