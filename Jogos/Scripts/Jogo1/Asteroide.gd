extends Node2D

var speed = 10
var escolhido = 0

func _ready():
	#Faz a função rand() ser diferete a cada inicio 
	randomize()
	
	#Faz todos os asteróides ficarem invisíveis
	for a in $Asteroides.get_children():
		a.visible = false
	
	#Escolhe um para ser o visivel
	escolhido = (randi() % $Asteroides.get_child_count()) + 1
	var node = get_node("Asteroides/Asteroid-"+str(escolhido))
	node.visible = true
	
	#Ajusta o shape do asteroide para o tamanho da textura escolhida
	$Area2D/CollisionShape2D.shape.radius = (node.texture.get_width()/2)* node.scale.x
	

func _process(delta):
	translate(Vector2(0, 1) * speed * delta)

func _on_Area2D_area_entered(area):
	queue_free()
