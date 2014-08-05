Rails.application.routes.draw do
      match "/" , to:  "map_page#gmap", via: :GET 
end
