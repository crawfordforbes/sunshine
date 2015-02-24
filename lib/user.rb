require 'bcrypt'
require 'active_record'
class User < ActiveRecord::Base
  has_secure_password
end