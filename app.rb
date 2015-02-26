require 'sinatra'
require 'sinatra/reloader'
require 'sqlite3'
require 'json'
require 'pry'
require './lib/pic'
require './lib/post'
require './lib/oldpost'
require './lib/user'
require './lib/connection'
require 'active_record'
require 'bcrypt'
include FileUtils::Verbose
enable :sessions

#landing page for user
get '/' do
	erb :index
end

#respond to ajax for carousel
get '/pics' do
	content_type :json
	pics = Pic.where("carousel = ?", 1)
	pics.to_json
end

#news ajax
get '/news' do
	content_type :json
	news = Post.where("section = ?", "news")
	news.to_json
end

#shows ajax
get '/shows' do
	content_type :json
	shows = Post.where("section = ?", "shows")
	shows.to_json
end

#press ajax
get '/press' do
	content_type :json
	press = Post.where("section = ?", "press")
	press.to_json
end

#video ajax
get '/videos' do
	content_type :json
	video = Post.where("section = ?", "video")
	video.to_json
end

#contact ajax
get '/contact' do
	content_type :json
	contact = Post.where("section = ?", "contact")
	contact.to_json
end

# does what it says
def authenticated?
	session[:valid_user] == true
end

# log in
get '/admin/login' do
	erb :"admin/login"
end

#create a user
post '/admin/user' do
	if params[:password] != params[:pass_confirm]
		redirect '/admin/login'
	else
		pass = BCrypt::Password.create(params[:password])
		session[:valid_user] = true
		User.create(name: params[:name], password_digest: pass)
		redirect '/admin'
	end
end

#actually log in
post '/admin/session' do
	user = User.find_by(name: params[:name])
	if user
		if BCrypt::Password.new(user.password_digest) == params[:password]
			session[:valid_user] = true
			redirect '/admin'
		else
			redirect '/admin/login'
		end
	else
		redirect '/admin/login'
	end
end

# CRUD pics
get '/admin/pics' do
	puts session[:valid_user]
	if authenticated?
	puts "GET ADMIN/PICS"
	pics = Pic.all()
	erb :"admin/pics", locals: {pics: pics}
else
	redirect '/admin/login'
end
end

# upload a pic, save the file in public, and add the url and carousel status to the pics table
post '/admin/pic' do
		if authenticated?
	puts "POST ADMIN/PIC"

	if params[:carousel_selection]
		car = 1
	else car = 0
	end
	tempfile = params[:file][:tempfile] 
	filename = params[:file][:filename] 
	cp(tempfile.path, "./public/#{filename}")
	Pic.create(url: filename, carousel: car)
	redirect '/admin/pics'
	else
	redirect '/admin/login'
end
end

# update carousel status of each pic
put '/admin/pics' do
		if authenticated?
	checked_string = params.keys[0].split(',')
	checked = []
	checked_string.each do |id| 
		checked<<id.to_i
	end
	puts checked
	pics = Pic.all()
	pics.each do |pic|
		x = 0
		while x < checked.length do
			if pic.id == checked[x]
				puts "in if: pic id = #{pic.id}, x = #{x}"
				pic.update(carousel: 1)
				x = checked.length
			else 
				puts "in else: pic id = #{pic.id}, x = #{x}"
				pic.update(carousel: 0)
				x += 1
			end
		end
	end
	redirect '/admin/pics'
	else
	redirect '/admin/login'
end
end

# show an individual pic
get '/admin/pic/:id' do
		if authenticated?
	pic = Pic.find_by(id: params[:id])
	erb :"admin/pic", locals: {pic: pic}
	else
	redirect '/admin/login'
end
end

#DESTROY!
delete '/admin/pic/:id' do
		if authenticated?
	pic = Pic.find_by(id: params[:id])
	filename = pic.url
	pic.delete
	File.delete("./public/#{filename}")
	redirect '/admin/pics'
	else
	redirect '/admin/login'
end
end

#CRUD posts
get '/admin/posts' do
		if authenticated?
	posts = Post.all()
	erb :"admin/posts", locals: {posts: posts}
	else
	redirect '/admin/login'
end
end

#show individual post
get '/admin/post/:id' do
		if authenticated?
	post = Post.find_by(id: params[:id])
	pics = Pic.all()
	erb :"admin/post", locals: {post: post, pics: pics}
	else
	redirect '/admin/login'
end
end

#update post
put '/admin/post' do
		if authenticated?
	puts params
	post = Post.find_by(id: params[:id].to_i)
	post.update(title: params[:title], story: params[:story], section: params[:section])
	redirect '/admin/posts'
	else
	redirect '/admin/login'
end
end

#create post
post '/admin/post' do
		if authenticated?
	Post.create(title: params[:title], story: params[:story], section: params[:section])
	redirect '/admin/posts'
	else
	redirect '/admin/login'
end
end

#archive deleted post, delete post in regular post table
delete '/admin/post/:id' do
		if authenticated?
	post = Post.find_by(id: params[:id])
	Oldpost.create(title: post.title, story: post.story, section: post.section)
	post.delete
	redirect '/admin/posts'
	else
	redirect '/admin/login'
end
end

delete '/admin/logout' do
	session[:valid_user] = false
	redirect '/'
end

#landing page for admin
get '/admin' do
		if authenticated?
	pics = Pic.all()
	erb :"admin/admin", locals: {pics: pics}
	else
	redirect '/admin/login'
end
end

