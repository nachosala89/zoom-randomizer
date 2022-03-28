class User < ApplicationRecord
  belongs_to :meeting
  after_initialize :default_values
  validates :name, presence: true, uniqueness: true

  private
    def default_values
      self.selected ||= 0
    end
end
