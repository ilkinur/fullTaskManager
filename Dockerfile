# Dockerfile
FROM php:7.4-fpm

# Install system dependencies
RUN apt-get update \
  && apt-get install -y \
  git \
  curl \
  libpng-dev \
  libonig-dev \
  libxml2-dev \
  zip \
  unzip \
  zlib1g-dev \
  libpq-dev \
  libzip-dev

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
  && docker-php-ext-install pdo pdo_pgsql pgsql zip bcmath gd


# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/TaskManagerBack

# Copy existing application files
COPY . /var/www

# Install Laravel dependencies
RUN composer install

# Change ownership of Laravel folders
RUN chown -R www-data:www-data /var/www/TaskManagerBack/storage /var/www/TaskManagerBack/bootstrap/cache

# Expose port
EXPOSE 9000

CMD ["php-fpm"]