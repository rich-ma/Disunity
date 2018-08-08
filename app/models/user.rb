class User < ApplicationRecord
  DEFAULT_AVATAR_URL =[]

  validates :username, :email, :avatar_url, :password_digest, :session_token, :username_salt, presence: true
  validates :email, :session_token, uniqueness: true
  validates_uniqueness_of :username, :scope => [:username_salt]

  after_intialize :ensure_session_token, :ensure_salt, :ensure_avatar_url

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    generate_unique_session_token
    save!
    self.session_token
  end

  private

  def ensure_avatar_url
    self.avatar_url ||= 
  end

  def generate_salt
    salt = ""
    4.times {salt << rand(0..9)}
    salt
  end

  def ensure_salt
    self.username_salt = generate_salt
    while User.find_by(username: self.username) &&
      User.find_by(username_salt: self.username_salt)
      self.username_salt = generate_salt
    end
  end

  def ensure_session_token
     self.session_token ||= generate_unique_session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_unique_session_token
    self.session_token = new_session_token
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end

end
