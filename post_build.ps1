Copy-Item "./build/*" -Destination "/home/anas/Desktop/Uni/sharingan.github.io" -Recurse -force

cd /home/anas/Desktop/Uni/sharingan.github.io
git add -A .
git commit -m 'almighty push'
git push -u origin main