Rails.application.routes.draw do
  root "static#index"
  get '/:id', to: 'static#index'
  namespace :v1 do
    resources :meetings do
      resources :users
    end
    put '/meetings/:id/reset', to: 'meetings#reset'
  end
end
