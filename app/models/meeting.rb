class Meeting < ApplicationRecord
  def encode_id
    Hashids.new("salt").encode(id)
  end
end
