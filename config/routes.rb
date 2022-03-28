Rails.application.routes.draw do
  root "static#index"
  get '/meeting/:id', to: 'static#index'
  namespace :v1 do
    resources :meetings do
      resources :users
    end
  end
end
