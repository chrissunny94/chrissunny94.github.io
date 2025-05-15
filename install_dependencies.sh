# Install dependencies
sudo apt update
sudo apt install -y git build-essential libssl-dev libreadline-dev zlib1g-dev

# Install rbenv and ruby-build
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-installer | bash

# Add rbenv to path
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc

# Install Ruby 3.2.3
rbenv install 3.2.3
rbenv global 3.2.3
