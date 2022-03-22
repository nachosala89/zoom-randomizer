class Meeting < ApplicationRecord
  has_many :users
  validates :name, presence: true, uniqueness: true
  
  def encode_id
    Hashids.new("salt").encode(id)
  end
end
