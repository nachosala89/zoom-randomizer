class Meeting < ApplicationRecord
  has_many :users
  
  def encode_id
    Hashids.new("salt").encode(id)
  end
end
