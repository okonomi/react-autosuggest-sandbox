Rails.application.routes.draw do
  resources "local_governments", only: :index
  root "welcome#home"
end
