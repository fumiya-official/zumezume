Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  get '/', to: 'home#index'

  # 認証
  get '/login', to: 'home#index'
  get '/signup', to: 'home#index'

  # 作品
  get '/works', to: 'home#index'
  get '/works/new', to: 'home#index'
  get '/works/:id', to: 'home#index'
  get '/works/:id/edit', to: 'home#index'

  # ユーザ
  get '/:name', to: 'home#index'
  get '/profile/setting', to: 'home#index'

  namespace :api do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        sessions: 'api/v1/auth/login'
      }
    end

    namespace :v1 do
      namespace :auth do
        get 'sessions', to: 'sessions#index'
        post 'check', to: 'sessions#check_uniqueness'
      end

      namespace :work do
        resources :works, only: %i[index show create update destroy]
        resources :comments, only: %i[index create update destroy]
      end

      namespace :user do
        resources :users, only: %i[index update show]
      end
    end

  end

end
