# Deployment in nginx
FROM docker-registry.cashfree.com/nginx:1.23.3-alpine

# Adding custom nginx conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the contents in nginx, as per the request routing expectation
COPY build /usr/share/nginx/html
COPY 404.html /usr/share/nginx/html
COPY 50x.html /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
