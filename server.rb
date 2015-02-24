require 'sinatra'
require 'sinatra/reloader'
require 'sqlite3'
# http://www.rubydoc.info/gems/sqlite3/1.3.10
require 'json'
require 'pry'
require './lib/pic'
require './lib/post'
require './lib/user'
require './lib/connection'
require 'active_record'
include FileUtils::Verbose


get '/' do
	all_posts = Post.all()
	erb(:index, locals: {all_posts: all_posts})
end

get '/post' do
	erb(:"posts/post")
end

# make a new blog post
post '/docs' do
	#get pics
	pics_arr = params[:pictures].split(", ")
	# save pics if they're not blog post specific
	if params[:article_only] == false
		pics_arr.each do |url|
			pic = Pic.new(url: url)
			pic.save
		end
	end
	post_hash = {
		title: params[:title],
		story: params[:story],
		pics: pics_arr
	}
	erb(:"posts/confirm", locals: {post_hash: post_hash})
end
# show all pics to admin
get '/pics' do
	pics = Pic.all()
	erb(:"posts/pics", locals: {pics: pics})
end

get '/upload' do
	puts "get upload"
    erb :"posts/upload"
end

post '/upload' do
    tempfile = params[:file][:tempfile] 
    filename = params[:file][:filename] 
    cp(tempfile.path, "public/#{filename}")
    Pic.create(url: filename)
    redirect '/pics'
end


post '/confirm' do
	Post.create(title: params[:title], story: params[:story], pics: params[:pics])
	redirect '/'
end
