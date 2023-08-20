# Documentação
> Este é o documento contendo informações sobre a organização do projeto, padronização das cenas e dos elementos de cena, e funcionamento das funções dos scripts.

## Organização das pastas:
> As pastas estão organizadas em "Sistema" e "Jogos", onde as pastas de sistemas são para o funcionamento geral e as pastas de jogos são para cada jogo em específico. 
>> 💡Dica: Evitar usar funções ou elementos do sistema em algum jogo, para manter os jogos isolados e funcionando independente
>
> A pasta de **Cenas** na raiz, contém as cenas do sistema, cada pasta de jogo contém suas próprias pastas de Cenas.
>
> A pasta de **Fontes** contém as fontes utilizadas em **TODO o sistema**, incluindo nos jogos
>> 💡Dica: Dentro da pasta Fontes há uma pasta "Fontes_Formatadas", que contém um arquivo que padroniza os elementos de cena
>
> A pasta de **Imagens** contém apenas as imagens do sistema, cada jogo possui suas próprias imagens que ficam em uma pasta **sprites**
>
> A pasta **Scripts** contém os scripts que controlam o sistema, e cada jogo possui sua própria pasta de scripts

## Padronização de cenas:
> ### Tamanho da tela / Background:
> 1920 x 1080

> ### Botôes:
> 💡 Sempre dentro do Background:<br>
> 400 x 80<br>
> Fonte: 40<br>
> Posição **Canto inferior direito:** (1440, 880)

> ### Barra superior
> 1920 x 158

> ### Barra lateral
> Posição: x: 1280 y: 0<br>
> Tamanho (640, 1080)

> ### Line Edit && Dropdown:
> 960 x 135<br>
> Posição **Centro da tela:** (480, 440)<br>
> Posioção **Dois lines:** 1°(480, 315) 2°(480, 585)<br>
> Posição **Com barra lateral:** X: 160

## Funcionamento do sistema:
> Aqui vem uma série de links de onde foram tiradas as informações para desenvolver algumas funcionalidades.

> Jogo 1:
> Registrar:
> Login:

> ### Firebase: 
>> [GodotFirebase](https://github.com/GodotNuts/GodotFirebase)<br>
>> [Documentação](https://github.com/GodotNuts/GodotFirebase/wiki/Installation-and-Activation)<br>
>> [Tutorial no youtube](https://www.youtube.com/watch?v=jKj57cXvViY&t=34s)<br>
>>> 💡: O tutorial não apresenta corretamente como algumas coisas devem ser feitas por ser antigo, mas da para acompanhar bem lendo a documentação

