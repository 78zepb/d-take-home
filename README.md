# Take home assignment 

## Start up environment  

Run each make command in a different terminal in the root of the project

```bash
# Start up temporal server
make server
```

```bash
# Start up worker
make worker
```


## Run assignment 

```bash
# Start workflow
# The showStarWars workflow takes the filter arugment which is people with red eyes and who's name contains numbers
# Actual arg:  
# '[{"propertyName":"eye_color","operator":"=","value":"red"},{"propertyName":"name","operator":"@","value":"containsNum"}]'
make workflow
```

## Run unit tests

```bash
# This command runs and watches the tests
make test
```
