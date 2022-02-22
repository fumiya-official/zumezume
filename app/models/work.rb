class Work < ApplicationRecord
  belongs_to :user
  # work : comments = 1 : N
  has_many :comments, dependent: :destroy
end
