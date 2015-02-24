require 'active_record'

class Pic < ActiveRecord::Base
  validates :url, uniqueness: true
end