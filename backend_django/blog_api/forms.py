from django import forms


class CommentForm(forms.Form):
    name = forms.CharField(max_length=100, )
    email = forms.EmailField(required=True)
    body = forms.CharField(widget=forms.Textarea)
