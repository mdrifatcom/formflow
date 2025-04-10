"use client"

import React, { useState, useCallback } from 'react';
import { suggestFields } from '@/ai/flows/suggest-fields';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface FormField {
  id: string;
  label: string;
  name: string;
  type: 'text' | 'number' | 'radio' | 'checkbox' | 'dropdown' | 'textarea';
  options?: { label: string; value: string; }[]; // Only for 'dropdown' type
}

const initialFields: FormField[] = [
    { id: '1', label: 'Full Name', name: 'fullName', type: 'text' },
    { id: '2', label: 'Email', name: 'email', type: 'text' },
    { id: '3', label: 'Message', name: 'message', type: 'textarea' }
  ];

export default function Home() {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");

  const handleSuggestFields = async () => {
    if (formTitle || formDescription) {
      try {
        const suggested = await suggestFields({ title: formTitle, description: formDescription });
        console.log("suggested fields:", suggested);
        // You might want to update the fields state with the suggested fields.
        // This is a placeholder; you'll need to adapt it to your specific needs.
        // For example, you might add the suggested fields to the end of the current fields array.
        // setFields(prevFields => [...prevFields, ...suggested.suggestedFields.map(field => ({ label: field, name: field.toLowerCase().replace(/\s/g, ''), type: 'text', id: Date.now().toString() }))]);
      } catch (error) {
        console.error("Failed to suggest fields:", error);
        // Handle error (e.g., display an error message to the user)
      }
    } else {
      console.warn("Please enter a form title or description to get suggestions.");
    }
  };


  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would handle the form submission, e.g., sending data to an API.
    console.log("Form submitted!");
  };

  return (
    
    
      
        Form Builder
      
      Build your forms with ease.
      

      
        
          Form Title
          Form Description
        
        Suggest Fields
      


      
        
          Generated Form
          Build your form.
        
        
          
            
              
                
                  
                    {field.label}
                  
                  {field.type === 'text' && (
                    
                  )}
                  {field.type === 'number' && (
                    
                  )}
                  {field.type === 'textarea' && (
                    
                  )}
                  {field.type === 'radio' && (
                    
                      {field.options && field.options.map((option, i) => (
                        
                          
                            
                            {option.label}
                          
                        
                      ))}
                    
                  )}
                  {field.type === 'checkbox' && (
                    
                      
                        
                          
                            {field.label}
                          
                        
                      
                    
                  )}
                  {field.type === 'dropdown' && (
                    
                      
                        
                          {field.label}
                        
                        
                          {field.options && field.options.map((option, i) => (
                            {option.label}
                          ))}
                        
                      
                    
                  )}
                
              
            
            
              Submit
            
          
        
      
    
    
  );
}
