# Based on https://github.com/yesinteractive/dadjokes/blob/master/Dockerfile

FROM alpine:3.18.0

ARG VERSION=20211111

# Install modules and updates
RUN apk --no-cache add \
        openssl \
        apache2 \
        apache2-ssl \
        apache2-http2 \
     	unzip \
        php7 \
        php7-apache2 \
        php7-common \
        php7-ctype \
        php7-curl \
        php7-json \
        php7-mbstring \
        php7-memcached \
        php7-opcache \
        php7-openssl \
        php7-session \
        php7-sockets \
    # Run required config / setup for apache
    # Fix group
    && sed -i -e 's/Group apache/Group www-data/g' /etc/apache2/httpd.conf \
    # Fix ssl module
    && sed -i -e 's/LoadModule ssl_module lib\/apache2\/mod_ssl.so/LoadModule ssl_module modules\/mod_ssl.so/g' /etc/apache2/conf.d/ssl.conf \
    && sed -i -e 's/LoadModule socache_shmcb_module lib\/apache2\/mod_socache_shmcb.so/LoadModule socache_shmcb_module modules\/mod_socache_shmcb.so/g' /etc/apache2/conf.d/ssl.conf \
    # Enable modules
    && sed -i -e 's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' /etc/apache2/httpd.conf \
    # Change document root to /app
    && mkdir /app && chown -R apache:apache /app \
    && sed -i -e 's/\/var\/www\/localhost\/htdocs/\/app/g' /etc/apache2/httpd.conf \
    && sed -i -e 's/\/var\/www\/localhost\/htdocs/\/app/g' /etc/apache2/conf.d/ssl.conf \
    # Allow for custom apache configs
    && mkdir /etc/apache2/conf.d/custom \
    && echo '' >> /etc/apache2/httpd.conf \
    && echo 'IncludeOptional /etc/apache2/conf.d/custom/*.conf' >> /etc/apache2/httpd.conf \
    # Fix modules
    && sed -i 's#AllowOverride None#AllowOverride All#' /etc/apache2/httpd.conf \
    && sed -i -e 's/ServerRoot \/var\/www/ServerRoot \/etc\/apache2/g' /etc/apache2/httpd.conf \
    && mv /var/www/modules /etc/apache2/modules \
    && mv /var/www/run /etc/apache2/run \
    && mv /var/www/logs /etc/apache2/logs \
    && rm -rf /var/www/* \
    && wget https://github.com/yesinteractive/dadjokes/archive/refs/tags/$VERSION.zip -P /app  \
    && unzip /app/$VERSION.zip -d /app \
    && rm -rf /app/$VERSION.zip \
    && cp -r /app/dadjokes-$VERSION/. /app \
    && rm -rf /app/dadjokes-$VERSION

WORKDIR /app

# Run apache in foreground
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
