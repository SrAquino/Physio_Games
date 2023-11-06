extends Control

var global_score
var currentJogo

var paciente_atual
var instituition
var currentFisio

func get_score():
	return str(global_score)
	
func get_paciente_nome():
	return str(paciente_atual)
	
func get_instituition():
	return str(instituition)
	
func get_fisio_nome():
	return str(currentFisio.name.stringValue)
	
func get_fisio_email():
	return str(currentFisio.email.stringValue)
	
func get_jogo():
	return currentJogo
