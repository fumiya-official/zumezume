Rails.application.config.middleware.insert_before 0, Rack::Cors do 
  allow do 
    origins 'localhost:3000'
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ["access-token", "expiry", "token-type", "uid", "client", 'X-CSRF-Token'],
      credentials: true
  end
end