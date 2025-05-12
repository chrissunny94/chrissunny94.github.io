.
#### Local setup using Docker (Recommended)
Using Docker to install Jekyll and Ruby dependencies is the easiest way.




```bash
$ docker compose pull
$ docker compose up
```



```
sudo apt install ruby-dev ruby-bundler -y
```


```
bundle install 
bundle exec jekyll serve --lsi --trace -P 4001
```