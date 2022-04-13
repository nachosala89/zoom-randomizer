class Meeting < ApplicationRecord
  has_many :users
  
  def encode_id
    Hashids.new("greater salt", 8).encode(id)
  end
end
