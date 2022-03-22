Rails.application.routes.draw do
  root "static#index"
  namespace :v1 do
    resources :meetings
  end
end
