Rails.application.routes.draw do
  resources :meetings
  root "static#index"
  namespace :v1, defaults: { format: 'json' } do
    resources :meeting
  end
end
