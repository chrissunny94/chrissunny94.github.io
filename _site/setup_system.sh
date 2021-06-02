sudo apt-get install ruby-full build-essential zlib1g-dev
mkdir ~/.ruby
echo 'export GEM_HOME=~/.ruby/' >> ~/.bashrc
echo 'export PATH="$PATH:~/.ruby/bin"' >> ~/.bashrc
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

gem install jekyll bundler
gem install github-pages
