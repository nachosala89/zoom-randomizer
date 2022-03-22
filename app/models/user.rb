class User < ApplicationRecord
  belongs_to :meeting
  after_initialize :default_values

  private
    def default_values
      self.selected ||= false
    end
end
