Copy-Item "./build/*" -Destination "C:\Users\manas\Desktop\FYP\sharingan.github.io" -Recurse -force

cd C:\Users\manas\Desktop\Uni\sharingan.github.io
git add -A .
git commit -m 'universall auto push'
git push -u origin main