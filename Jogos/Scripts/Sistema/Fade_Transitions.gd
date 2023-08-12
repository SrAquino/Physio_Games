extends CanvasLayer

onready var animation = get_node("AnimationPlayer")

var target_scene: String

func fade_in(scene: String):
	target_scene = scene
	animation.play("fade_in")
	

func _on_AnimationPlayer_animation_finished(anim_name):
	if anim_name == "fade_in":
		var _changed = get_tree().change_scene(target_scene)
		animation.play("fade_out")
	elif anim_name == "fade_out":
		pass
